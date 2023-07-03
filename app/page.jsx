"use client";
import { useRef, useState } from "react";

export default function Home() {
	const [fileDrag, setFileDrag] = useState(false);
	const filePickerInput = useRef(null);
	return (
		<main className="bg-background text-primary-text flex items-center justify-center">
			<div className="max-w-4xl py-24 px-12 flex min-h-screen w-screen flex-col items-center gap-12">
				<p className="text-4xl">test</p>
				<div className="bg-surface-1 border-border-1 border w-full rounded-lg p-8 flex flex-col gap-4">
					<div>
						<p className="text-xl">Select image</p>
						<p className="text-sm text-secondary-text">Images larger than 256x256px may not load on mapmaker</p>
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
									console.log(e.target.files[0]);
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
			</div>
		</main>
	);
}
