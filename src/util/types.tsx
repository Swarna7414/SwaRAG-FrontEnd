import React from "react";
import { ImLinkedin } from "react-icons/im";
import { BiLogoGmail } from "react-icons/bi";
import { FaSquareGithub } from "react-icons/fa6";



interface links {
    logo: React.ReactElement;
    name: string;
    value: string;
  }

export interface alllinks{
    links:links[]
}

export const displaylinks:links[]=[
    {
        logo: <ImLinkedin />,
        name: "LinkedIn",
        value: "www.linkedin.com/in/swarna-sai-sankar-a1084a203"
    },
    {
        logo: <BiLogoGmail/>,
        name:"Gmail",
        value:"swarnasaisankar333@gmail.com"
    },
    {
        logo: <FaSquareGithub/>,
        name: "GitHub",
        value:"https://github.com/Swarna7414"
    }
]