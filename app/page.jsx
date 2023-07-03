"use client";
import { useRef, useState } from "react";

import { imageHandler } from "../src/script.js";

export default function Home() {
	const [fileDrag, setFileDrag] = useState(false);
	const [image, setImage] = useState(null);
	const [code, setCode] = useState(null);
	const filePickerInput = useRef(null);
	return (
		<main className="bg-background text-primary-text flex items-center justify-center">
			<div className="max-w-4xl py-24 px-12 flex min-h-screen w-screen flex-col items-center gap-12">
				<p className="text-4xl">test</p>
				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<div>
						<p className="text-xl">Select image</p>
						<p className="text-sm text-secondary-text">Images larger than 128x128px may not be accepted by the mapmaker</p>
						<p className="text-sm text-secondary-text">Recommended size: 64x64px</p>
					</div>
					<div
						className={(fileDrag ? "hidden " : "flex ") + "flex-col justify-center items-center h-48 w-full select-none bg-surface-0 p-16 rounded-3xl border-dashed border border-border-1"}
						onDragEnter={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setFileDrag(true);
						}}
					>
						<p>
							{"Drag an image here or "}
							<button
								className="text-link-text"
								onClick={() => {
									filePickerInput.current.click();
								}}
							>
								upload a file
							</button>
							<input
								className="hidden"
								type="file"
								name="file"
								accept="image/png, image/jpeg"
								ref={(ref) => (filePickerInput.current = ref)}
								onChange={async (e) => {
									if (e.target.files[0]) {
										var res = await imageHandler(e.target.files[0], {
											mapId: "12512",
											token: "c7221a73d4144752516932b873f849e6",
											stringId: "test3"
										});
										setCode(res);
									}
								}}
							/>
						</p>
						<p className="text-secondary-text text-sm">Allowed image types: JPEG, PNG</p>
					</div>
					<div
						className={(fileDrag ? "flex " : "hidden ") + "flex-col justify-center items-center h-48 w-full select-none bg-highlight p-16 rounded-3xl border-dashed border border-border-1"}
						onDragLeave={(e) => {
							e.stopPropagation();
							setFileDrag(false);
						}}
						onDrop={(e) => {
							e.preventDefault();
							e.stopPropagation();
							setFileDrag(false);
							console.log(e.dataTransfer.files);
						}}
						onDragOver={(e) => {
							e.preventDefault();
							e.stopPropagation();
						}}
					>
						<p>Drop an image here</p>
					</div>
				</div>

				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<p className="text-xl">Settings</p>
				</div>

				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<p className="text-xl">Results</p>
					<div className="min-h-48 w-full overflow-x-auto bg-surface-0 p-8 rounded-xl border border-border-1">
						<pre>
							<code>{code}</code>
						</pre>
					</div>
				</div>
			</div>
		</main>
	);
}
