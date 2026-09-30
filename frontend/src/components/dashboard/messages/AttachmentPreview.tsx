"use client";

import { X, FileText } from "lucide-react";

interface Props {

    files: File[];

    removeFile: (index: number) => void;

}

export default function AttachmentPreview({

    files,

    removeFile,

}: Props) {

    if (!files.length) return null;

    return (

        <div
            className="
            mb-4
            flex
            flex-wrap
            gap-3"
        >

            {

                files.map((file, index) => (

                    <div

                        key={index}

                        className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        border
                        border-slate-700
                        bg-slate-950
                        px-4
                        py-3"

                    >

                        <FileText
                            className="
                            h-5
                            w-5
                            text-[#46A6D9]"
                        />

                        <div>

                            <p
                                className="
                                max-w-[180px]
                                truncate
                                text-sm
                                font-medium"
                            >

                                {file.name}

                            </p>

                            <p
                                className="
                                text-xs
                                text-slate-400"
                            >

                                {(file.size / 1024 / 1024).toFixed(2)} MB

                            </p>

                        </div>

                        <button

                            onClick={() =>
                                removeFile(index)
                            }

                            className="
                            rounded
                            p-1
                            hover:bg-slate-800"

                        >

                            <X className="h-4 w-4"/>

                        </button>

                    </div>

                ))

            }

        </div>

    );

}