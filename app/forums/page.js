import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

const topics = [
    {
        text: "Python",
        img: "/python.webp",
        desc: "Discuss about Python programming language"
    },
    {
        text: "JavaScript",
        img: "/javascript.webp",
        desc: "Explore the fundamentals of JavaScript"
    },
    {
        text: "HTML",
        img: "/html.webp",
        desc: "A deep dive into Hypertext Markup Language"
    },
    {
        text: "CSS",
        img: "/css.webp",
        desc: "Styling web pages with Cascading Style Sheets"
    },
    {
        text: "React",
        img: "/react.webp",
        desc: "Building user interfaces with the React library"
    },
    {
        text: "Node.js",
        img: "/nodejs.webp",
        desc: "Server-side programming with Node.js"
    }
];

const Forums = () => {
    return (
        <div className='container mx-auto my-28'>
            <h3 className='text-5xl text-center font-semibold flex gap-2 justify-center mb-10'>Discussion Forums</h3>
            <div className='flex flex-wrap justify-center'>
                {topics.map((topic) => {
                    return <div key={topic.img} className='shadow-lg bg-slate-200 w-1/4 m-4 flex justify-center flex-col items-center py-10 rounded-xl gap-4'>
                        <Image alt={topic.desc} src={topic.img} width={74} height={74} className=''/>
                        <h2 className='text-2xl'>{topic.text}</h2>
                        <p className='px-3'>{topic.desc}</p>
                        <Button className='px-4 border border-slate-300 py-2'>
                            Discuss Now
                        </Button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Forums
