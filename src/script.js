const mapPrefix = `fetch("https://apibeta.deeeep.io/maps/{{mapId}}", {
  "headers": {
    "authorization": "Bearer {{token}}",
    "content-type": "application/json;charset=UTF-8",
  },
  "body": "{\\"string_id\\":\\"{{stringId}}\\",\\"data\\":\\"{\\\\\\"screenObjects\\\\\\":[`;
const pixelTemplate = `{\\\\\\"type\\\\\\":\\\\\\"Sky\\\\\\",\\\\\\"layerId\\\\\\":\\\\\\"sky\\\\\\",\\\\\\"points\\\\\\":[{\\\\\\"x\\\\\\":{{x1}},\\\\\\"y\\\\\\":{{y1}}},{\\\\\\"x\\\\\\":{{x2}},\\\\\\"y\\\\\\":{{y2}}},{\\\\\\"x\\\\\\":{{x3}},\\\\\\"y\\\\\\":{{y3}}},{\\\\\\"x\\\\\\":{{x4}},\\\\\\"y\\\\\\":{{y4}}}],\\\\\\"settings\\\\\\":{\\\\\\"collidable\\\\\\":true},\\\\\\"colors\\\\\\":[{{color}},{{color}}]}`;
const mapSuffix = `],\\\\\\"settings\\\\\\":{\\\\\\"gravity\\\\\\":9.8},\\\\\\"worldSize\\\\\\":{\\\\\\"width\\\\\\":\\\\\\"{{width}}\\\\\\",\\\\\\"height\\\\\\":\\\\\\"{{height}}\\\\\\"}}\\"}",
  "method": "PUT"
});`;

export function fileToUrl(file) {
	return new Promise((resolve, reject) => {
		var reader = new FileReader();
		reader.onload = function () {
			var arrayBuffer = this.result,
				blob = new Blob([arrayBuffer], { type: file.type }),
				url = URL.createObjectURL(blob);
			resolve(url);
		};
		reader.readAsArrayBuffer(file);
		reader.onerror = (error) => reject(error);
	});
}

function pixelsFromImg(url) {
	return new Promise(async (resolve, reject) => {
		try {
			var canvas = document.createElement("canvas");

			var pic = new Image();
			pic.src = url;
			pic.onload = function () {
				var width = pic.width;
				var height = pic.height;

				canvas.width = width;
				canvas.height = height;
				var ctx = canvas.getContext("2d");

				ctx.drawImage(pic, 0, 0);

				var c = canvas.getContext("2d");
				var arr = [];
				for (var x = 0; x < width; x++) {
					for (var y = 0; y < height; y++) {
						var p = c.getImageData(x, y, 1, 1).data;
						var hex = p[0].toString(16).padStart(2, "0") + p[1].toString(16).padStart(2, "0") + p[2].toString(16).padStart(2, "0");
						var dec = parseInt(hex, 16);
						if (!arr[x]) arr.push([]);
						arr[x].push(dec);
					}
				}

				canvas.remove(); // clean up
				return resolve({ arr, width, height });
			};
		} catch (err) {
			return reject(err);
		}
	});
}

export const imageHandler = (file, { mapId, token, stringId, scale = 1 }) => {
	return new Promise(async (resolve, reject) => {
		try {
			var url = await fileToUrl(file);
			var pixelObj = await pixelsFromImg(url);
			var pixels = pixelObj.arr;
			var width = pixelObj.width;
			var height = pixelObj.height;
			var code = mapPrefix.replaceAll("{{mapId}}", mapId).replaceAll("{{token}}", token).replaceAll("{{stringId}}", stringId);
			for (var x = 0; x < width; x++) {
				for (var y = 0; y < height; y++) {
					var pixel = pixels[x][y];
					var x1 = x * scale,
						y1 = y * scale,
						x2 = x * scale,
						y2 = (y + 1) * scale,
						x3 = (x + 1) * scale,
						y3 = (y + 1) * scale,
						x4 = (x + 1) * scale,
						y4 = y * scale;
					code += pixelTemplate
						.replaceAll("{{x1}}", x1)
						.replaceAll("{{y1}}", y1)
						.replaceAll("{{x2}}", x2)
						.replaceAll("{{y2}}", y2)
						.replaceAll("{{x3}}", x3)
						.replaceAll("{{y3}}", y3)
						.replaceAll("{{x4}}", x4)
						.replaceAll("{{y4}}", y4)
						.replaceAll("{{color}}", pixel);
					if (x != width - 1 || y != height - 1) {
						code += ",";
					}
				}
			}
			code += mapSuffix.replaceAll("{{width}}", (width * scale) / 10).replaceAll("{{height}}", (height * scale) / 10);
			return resolve(code);
		} catch (error) {
			return reject(error);
		}
	});
};
