import React from 'react'
import Image from 'next/image'

const topics = [
    {
        text: "Python",
        img: "/python.png",
        desc: "Discuss about Python programming language"
    },
    {
        text: "JavaScript",
        img: "/javascript.png",
        desc: "Explore the fundamentals of JavaScript"
    },
    {
        text: "HTML",
        img: "/html.png",
        desc: "A deep dive into Hypertext Markup Language"
    },
    {
        text: "CSS",
        img: "/css.png",
        desc: "Styling web pages with Cascading Style Sheets"
    },
    {
        text: "React",
        img: "/react.png",
        desc: "Building user interfaces with the React library"
    },
    {
        text: "Node.js",
        img: "/nodejs.png",
        desc: "Server-side programming with Node.js"
    }
];

const Forums = () => {
    return (
        <div className='container mx-auto my-28'>
            <h1 className='text-4xl text-center font-bold'>Discussion Forums</h1>
            <div className='flex flex-wrap justify-center'>
                {topics.map((topic) => {
                    return <div key={topic.img} className='shadow-lg bg-slate-500 w-1/4 m-4 flex justify-center flex-col items-center py-10'>
                        <Image src={topic.img} width={34} height={34} />
                        <h2 className='text-2xl'>{topic.text}</h2>
                        <p>{topic.desc}</p>
                        <button>
                            Discuss Now
                        </button>
                    </div>
                })}
            </div>
        </div>
    )
}

export default Forums
