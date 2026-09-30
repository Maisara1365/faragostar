import Image from "next/image";

import { company } from "@/config/company";

export default function Logo() {

    return (

        <Image

            src={company.logo}

            alt={company.englishName}

            width={180}

            height={70}

            priority

        />

    );

}