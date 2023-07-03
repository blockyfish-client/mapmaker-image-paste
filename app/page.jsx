"use client";
import { useRef, useState } from "react";

import { imageHandler } from "../src/script.js";

export default function Home() {
	const [fileDrag, setFileDrag] = useState(false);
	const [image, setImage] = useState(null);
	const [mapUrlOk, setMapUrlOk] = useState(null);
	const [code, setCode] = useState(null);
	const filePickerInput = useRef(null);
	const mapUrlInput = useRef(null);
	const mapIdInput = useRef(null);
	const stringIdInput = useRef(null);
	const bearerInput = useRef(null);
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
								onChange={(e) => {
									setImage(e.target.files[0]);
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
					<div className="flex justify-between">
						<div className="flex flex-col w-[calc(50%-16px)] gap-4">
							<div className="flex flex-col gap-2">
								<p>Map ID</p>
								<input
									type="text"
									placeholder="Ex. 12512"
									className="bg-surface-0 border border-border-1 outline-none py-1 px-2 rounded-lg"
									ref={(ref) => (mapIdInput.current = ref)}
								/>
							</div>
							<div className="flex flex-col gap-2">
								<p>Map string ID</p>
								<input
									type="text"
									placeholder="Ex. test3"
									className="bg-surface-0 border border-border-1 outline-none py-1 px-2 rounded-lg"
									ref={(ref) => (stringIdInput.current = ref)}
								/>
							</div>
						</div>
						<div className="flex flex-col w-[calc(50%-16px)]">
							<div className="flex flex-col gap-2">
								<p>Bearer token</p>
								<input
									type="text"
									placeholder="Ex. c7221a73d4144752516932b873f849e6"
									className="bg-surface-0 border border-border-1 outline-none py-1 px-2 rounded-lg"
									ref={(ref) => (bearerInput.current = ref)}
								/>
							</div>
						</div>
					</div>

					<hr className="border-secondary-text border-dashed" />

					<div className="flex flex-col gap-2">
						<p>Don't know how to get map ID and string ID?</p>
						<p>Input map URL below</p>
						<div className="flex bg-surface-0 border border-border-1 py-1 px-2 rounded-lg">
							<p>https://mapmaker.deeeep.io/map/</p>
							<input
								type="text"
								placeholder="test3"
								className="grow bg-[#0000] outline-none"
								ref={(ref) => (mapUrlInput.current = ref)}
								onChange={async () => {
									mapUrlInput.current.value = mapUrlInput.current.value.replace("https://mapmaker.deeeep.io/map/", "");
									setMapUrlOk("pending");
									const res = await (await fetch("https://apibeta.deeeep.io/maps/s/" + mapUrlInput.current.value)).json();
									if (res.error) {
										setMapUrlOk(false);
										mapIdInput.current.value = "";
										stringIdInput.current.value = "";
									} else {
										setMapUrlOk(true);
										mapIdInput.current.value = res.id;
										stringIdInput.current.value = res.string_id;
									}
								}}
							/>
							{mapUrlOk == true ? (
								<i className="bi bi-check2 text-success-text"></i>
							) : mapUrlOk == false ? (
								<i className="bi bi-x-lg text-error-text"></i>
							) : mapUrlOk == "pending" ? (
								<i className="bi bi-three-dots text-secondary-text"></i>
							) : (
								<></>
							)}
						</div>
					</div>
					<button
						className="bg-blue-0 w-fit self-center py-2 px-4 rounded-2xl border-b-4 border-b-blue-1 hover:brightness-95 active:border-b-0 active:mt-1"
						onClick={async () => {
							var res = await imageHandler(image, {
								mapId: mapIdInput.current.value,
								stringId: stringIdInput.current.value,
								token: bearerInput.current.value
							});
							setCode(res);
						}}
					>
						Generate!
					</button>
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
