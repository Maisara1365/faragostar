import {

    FileText,

    Image,

    Download,

} from "lucide-react";

interface Props {

    attachment: string;

}

export default function AttachmentBubble({

    attachment,

}: Props) {

    const url =

        `${process.env.NEXT_PUBLIC_STORAGE_URL}/${attachment}`;

    const fileName =

        attachment.split("/").pop() || "";

    const isImage =

        /\.(jpg|jpeg|png|gif|webp)$/i.test(fileName);

    return (

        <div
            className="
            mt-3
            overflow-hidden
            rounded-xl
            border
            border-slate-700"
        >

            {

                isImage && (

                    <img

                        src={url}

                        alt={fileName}

                        className="
                        max-h-60
                        w-full
                        object-cover"

                    />

                )

            }

            <div
                className="
                flex
                items-center
                justify-between
                bg-slate-800
                px-4
                py-3"
            >

                <div
                    className="
                    flex
                    items-center
                    gap-3"
                >

                    {

                        isImage

                            ?

                            <Image className="h-5 w-5" />

                            :

                            <FileText className="h-5 w-5" />

                    }

                    <span
                        className="
                        text-sm
                        truncate"
                    >

                        {fileName}

                    </span>

                </div>

                <a

                    href={url}

                    download

                    target="_blank"

                    rel="noreferrer"

                    className="
                    rounded-lg
                    p-2
                    transition
                    hover:bg-slate-700"

                >

                    <Download className="h-5 w-5" />

                </a>

            </div>

        </div>

    );

}