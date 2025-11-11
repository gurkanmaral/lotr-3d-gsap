'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SplitText } from 'gsap/all'
import { useMediaQuery } from 'react-responsive'
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(ScrollTrigger, SplitText)

const Hero = () => {
    const artRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const paragraphRefs = useRef<HTMLParagraphElement[]>([])
    const imgRef = useRef<HTMLImageElement>(null)

    const isMobile = useMediaQuery({ maxWidth: 767 })

    useGSAP(() => {
        if (!artRef.current || !titleRef.current || !imgRef.current) return

        const start = isMobile ? 'top 20%' : 'top top'

        // SplitText instances
        const titleSplit = new SplitText(titleRef.current, { type: 'words' })
        const paragraphSplits = paragraphRefs.current.map(
            (p) => new SplitText(p, { type: 'lines' })
        )

        // Set initial states
        gsap.set(imgRef.current, { scale: 1.1, maskSize: '40%' })
        gsap.set(titleSplit.words, { opacity: 0, yPercent: 100 })
        paragraphSplits.forEach((split) =>
            gsap.set(split.lines, { opacity: 0, yPercent: 100 })
        )

        // Timeline with ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: artRef.current,
                start: start,
                end: 'bottom center',
                scrub: 1,
                pin: true,
            },
        })

        tl.to(imgRef.current, {
            scale: 1,
            maskSize: '300%',
            duration: 3,
            ease: 'power2.inOut',
        })
        tl.to(imgRef.current, {
            maskImage: 'none',
            duration: 2,
            ease: 'power2.inOut',
        })
        tl.to(titleSplit.words, {
            opacity: 1,
            yPercent: 0,
            duration: 2,
            ease: 'expo.out',
            stagger: 0.2,
        })
        paragraphSplits.forEach((split, i) => {
            tl.to(
                split.lines,
                {
                    opacity: 1,
                    yPercent: 0,
                    duration: 2,
                    ease: 'expo.out',
                    stagger: 0.15,
                },
                i === 0 ? '-=1' : '>-0.5'
            )
        })

        return () => {
            tl.kill()
            titleSplit.revert()
            paragraphSplits.forEach((split) => split.revert())
        }
    }, [isMobile]) // runs again if screen size changes

    return (
        <section
            id="art"
            ref={artRef}
            className="relative min-h-screen flex-center overflow-hidden"
        >
            <div className="cocktail-img">
                <img
                    ref={imgRef}
                    src="/images/lotr-hero-bg.jpg"
                    alt="LOTR Hero"
                    className="masked-img size-full object-cover"
                />
            </div>

            <div id="about" className="absolute text-center max-w-2xl px-6">
                <h2 ref={titleRef} className="text-white text-4xl font-bold mb-4">
                    The Journey of Middle-Earth
                </h2>
                {[
                    'Through mist and shadow, across mountains and rivers, destiny awaits those who dare to walk beyond the Shire.',
                    'asdasd',
                ].map((text, i) => (
                    <p
                        key={i}
                        ref={(el) => {
                            if (el) paragraphRefs.current[i] = el
                        }}
                        className="text-white text-lg leading-relaxed"
                    >
                        {text}
                    </p>
                ))}
            </div>
        </section>
    )
}

export default Hero
