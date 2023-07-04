"use client";
import { useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { fileToUrl, imageHandler } from "../src/script.js";
import ReactModal from "react-modal";

export default function Home() {
	const [fileDrag, setFileDrag] = useState(false);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [mapUrlOk, setMapUrlOk] = useState(null);
	const [code, setCode] = useState("");
	const [showFullCode, setShowFullCode] = useState(false);
	const [bearerTokenModalOpen, setBearerTokenModalOpen] = useState(false);

	const filePickerInput = useRef(null);
	const scaleInput = useRef(null);
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
					{image ? (
						<div className="flex flex-col items-center">
							{imageUrl ? (
								<div className="flex flex-col items-center gap-8">
									<img
										src={imageUrl}
										className="w-40 h-40 [image-rendering:pixelated] rounded-lg"
									/>
									<button
										className="bg-red-500 w-fit self-center py-2 px-4 rounded-2xl border-b-4 border-b-red-600 hover:brightness-95 active:border-b-0 active:mt-1"
										onClick={() => {
											setImage(null);
											setImageUrl(null);
										}}
									>
										Clear image
									</button>
								</div>
							) : (
								<></>
							)}
						</div>
					) : (
						<>
							<div
								className={
									(fileDrag ? "hidden " : "flex ") + "flex-col justify-center items-center h-48 w-full select-none bg-surface-0 p-16 rounded-3xl border-dashed border border-border-1"
								}
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
											console.log(e.target.files[0]);
											setImage(e.target.files[0]);
											(async () => {
												setImageUrl(await fileToUrl(e.target.files[0]));
											})();
										}}
									/>
								</p>
								<p className="text-secondary-text text-sm">Allowed image types: JPEG, PNG</p>
							</div>
							<div
								className={
									(fileDrag ? "flex " : "hidden ") + "flex-col justify-center items-center h-48 w-full select-none bg-highlight p-16 rounded-3xl border-dashed border border-border-1"
								}
								onDragLeave={(e) => {
									e.stopPropagation();
									setFileDrag(false);
								}}
								onDrop={(e) => {
									e.preventDefault();
									e.stopPropagation();
									setFileDrag(false);
									setImage(e.dataTransfer.files[0]);
									(async () => {
										setImageUrl(await fileToUrl(e.dataTransfer.files[0]));
									})();
								}}
								onDragOver={(e) => {
									e.preventDefault();
									e.stopPropagation();
								}}
							>
								<p>Drop an image here</p>
							</div>
						</>
					)}
				</div>

				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<p className="text-xl">Settings</p>

					<div className="flex justify-between">
						<div className="flex flex-col w-[calc(50%-16px)] gap-4">
							<div className="flex flex-col gap-2">
								<p>Scale</p>
								<input
									type="text"
									placeholder="1"
									defaultValue={1}
									className="bg-surface-0 border border-border-1 outline-none py-1 px-2 rounded-lg"
									ref={(ref) => (scaleInput.current = ref)}
								/>
							</div>
						</div>
						<div className="flex flex-col w-[calc(50%-16px)]">
							<div className="flex flex-flex gap-4 items-center">
								<input
									type="checkbox"
									ref={(ref) => (mapIdInput.current = ref)}
								/>
								<p>Optimize map for images with solid color or transparent background</p>
							</div>
						</div>
					</div>

					<hr className="border-secondary-text border-dashed" />

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
								<p>
									Bearer token{" "}
									<button onClick={() => setBearerTokenModalOpen(true)}>
										<i className="bi bi-question-circle text-sm"></i>
									</button>
								</p>
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
						className="bg-blue-500 w-fit self-center py-2 px-4 rounded-2xl border-b-4 border-b-blue-600 hover:brightness-95 active:border-b-0 active:mt-1"
						onClick={async () => {
							if (!image) toast.error("Please upload an image first");
							else if (!scaleInput.current.value) toast.error("Please input image scale");
							else if (!mapIdInput.current.value) toast.error("Please input map ID");
							else if (!stringIdInput.current.value) toast.error("Please input map string ID");
							else if (!bearerInput.current.value) toast.error("Please input bearer token");

							if (image && mapIdInput.current.value && stringIdInput.current.value && bearerInput.current.value) {
								var res = await imageHandler(image, {
									mapId: mapIdInput.current.value,
									stringId: stringIdInput.current.value,
									token: bearerInput.current.value,
									scale: scaleInput.current.value
								});
								setShowFullCode(false);
								setCode(res);
								toast.success("Code generated!");
							}
						}}
					>
						Generate!
					</button>
				</div>

				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<p className="text-xl">Results</p>
					<>
						<div className="relative min-h-48 w-full overflow-x-auto bg-surface-0 p-8 rounded-xl border border-border-1">
							<button
								className={
									(code ? "" : "hidden ") +
									"flex items-center justify-center w-10 h-10 bg-[#fff2] hover:bg-[#fff3] border-[#fff2] transition-all border absolute top-4 right-4 rounded"
								}
								onClick={() => {
									navigator.clipboard.writeText(code);
									toast.success("Copied to clipboard!");
								}}
							>
								<i className="bi bi-clipboard text-[#eee] text-lg"></i>
							</button>
							<pre>
								<code>
									{showFullCode
										? code
										: code.slice(0, 200) +
										  (code ? `\n... ${(code.length - 100).toLocaleString("en-US")} characters hidden` : "Click the generate button above to generate code for mapmaker")}
								</code>
							</pre>
						</div>
						<button
							className={(showFullCode || !code ? "hidden " : "") + "w-fit -mt-2 text-secondary-text flex items-center hover:bg-[#fff1] py-1 px-2 rounded-lg"}
							onClick={() => {
								setShowFullCode(true);
							}}
						>
							<i className="bi bi-arrows-angle-expand text-xs mr-2"></i> Show full code <span className="text-xs ml-1">(This can cause the page to lag a lot)</span>
						</button>
					</>
				</div>
			</div>

			<ReactModal
				isOpen={bearerTokenModalOpen}
				shouldCloseOnEsc={true}
				shouldCloseOnOverlayClick={true}
				onRequestClose={() => setBearerTokenModalOpen(false)}
			>
				<div className="w-[500px] h-[calc(100vh-300px)] pt-8 px-0 m-0 flex flex-col gap-4">
					<div className="self-end relative h-0">
						<button
							className="relative right-8 top-0"
							onClick={() => setBearerTokenModalOpen(false)}
						>
							<i className="bi bi-x"></i>
						</button>
					</div>
					<p className="text-xl mb-2 -mt-4 px-8">How to get bearer token</p>
					<div className="grow h-full overflow-y-auto pl-12 pr-8 pb-8">
						<ol className="list-decimal space-y-4">
							<li>
								<p>
									Open{" "}
									<a
										className="text-link-text"
										href="https://mapmaker.deeeep.io"
										target="_blank"
									>
										Deeeep.io Mapmaker
									</a>
									.
								</p>
								<img
									src="/img/bearertoken/1.png"
									className="rounded mt-2"
								/>
							</li>
							<li>
								<p>Open DevTools by pressing Ctrl+Shift+I and go to the Networks tab.</p>
								<img
									src="/img/bearertoken/2.png"
									className="rounded mt-2"
								/>
							</li>
							<li>
								<p>Login to your account on Mapmaker, then click on the network log that says "signin".</p>
								<img
									src="/img/bearertoken/3.png"
									className="rounded mt-2"
								/>
							</li>
							<li>
								<p>Go to the Response tab and copy the token. That's your bearer token.</p>
								<img
									src="/img/bearertoken/4.png"
									className="rounded mt-2"
								/>
							</li>
						</ol>
					</div>
				</div>
			</ReactModal>

			<ToastContainer
				style={{
					zIndex: 69420
				}}
				position="bottom-center"
				autoClose={2000}
				hideProgressBar
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable={false}
				pauseOnHover={false}
				theme="dark"
			/>
		</main>
	);
}
