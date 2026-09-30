"use client";

import { Upload, X, FileText } from "lucide-react";

interface Props {
    files: File[];
    setFiles: (files: File[]) => void;
    uploadProgress?: Record<string, number>;
    uploadFinished?: Record<string, boolean>;
}

export default function FileUploader({
    files,
    setFiles,
    uploadProgress,
    uploadFinished,
}: Props) {
    function handleChange(
        e: React.ChangeEvent<HTMLInputElement>
    ) {
        const selected =
            Array.from(
                e.target.files || []
            );
        setFiles([
            ...files,
            ...selected,
        ]);
    }

    function removeFile(index: number) {
        setFiles(
            files.filter(
                (_, i) => i !== index
            )
        );
    }

    return (
        <div className="space-y-5">
            <label
                className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-3xl
                border-2
                border-dashed
                border-slate-600
                bg-slate-900/50
                p-12
                transition
                hover:border-[#46A6D9]
                hover:bg-slate-900"
            >
                <Upload
                    className="
                    mb-4
                    h-12
                    w-12
                    text-[#46A6D9]"
                />
                <p className="font-medium text-white">
                    Click to upload files
                </p>
                <p className="mt-1 text-sm text-slate-400">
                    PDF, Images, ZIP, DOCX...
                </p>
                <input
                    hidden
                    multiple
                    type="file"
                    accept="
                        .pdf,
                        .doc,
                        .docx,
                        .xls,
                        .xlsx,
                        .ppt,
                        .pptx,
                        .zip,
                        .rar,
                        .jpg,
                        .jpeg,
                        .png,
                        .webp
                    "
                    onChange={handleChange}
                />
            </label>

            {files.length > 0 && (
                <div className="space-y-3">
                    {files.map(
                        (file, index) => (
                            <div
                                key={index}
                                className="
                                flex
                                items-center
                                justify-between
                                rounded-2xl
                                bg-slate-800
                                px-5
                                py-4"
                            >
                                <div className="flex items-center gap-4">
                                    <FileText
                                        className="
                                        h-6
                                        w-6
                                        text-[#46A6D9]"
                                    />
                                    <div>
                                        <p className="font-medium text-white">
                                            {file.name}
                                        </p>
                                        <p className="text-xs text-slate-400">
                                            {(
                                                file.size /
                                                1024 /
                                                1024
                                            ).toFixed(2)} MB
                                        </p>
                                        <div className="mt-2">
                                            <div
                                                className="
                                                h-2
                                                overflow-hidden
                                                rounded-full
                                                bg-slate-700"
                                            >
                                                <div
                                                    className="
                                                    h-full
                                                    rounded-full
                                                    bg-[#46A6D9]
                                                    transition-all
                                                    duration-300"
                                                    style={{
                                                        width: `${
                                                            uploadProgress?.[
                                                                file.name
                                                            ] || 0
                                                        }%`,
                                                    }}
                                                />
                                            </div>
                                            <div
                                                className="
                                                mt-1
                                                flex
                                                justify-between
                                                text-xs
                                                text-slate-400"
                                            >
                                                <span>
                                                    {
                                                        uploadFinished?.[
                                                            file.name
                                                        ]
                                                            ? "Completed"
                                                            : `${
                                                                uploadProgress?.[
                                                                    file.name
                                                                ] || 0
                                                            }%`
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() =>
                                        removeFile(index)
                                    }
                                    className="
                                    rounded-full
                                    p-2
                                    hover:bg-slate-700"
                                >
                                    <X
                                        className="
                                        h-4
                                        w-4
                                        text-red-400"
                                    />
                                </button>
                            </div>
                        )
                    )}
                </div>
            )}
        </div>
    );
}