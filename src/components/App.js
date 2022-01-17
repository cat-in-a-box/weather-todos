import React from "react";
import '../css/style.scss'

import Planner from './Planner';
import Weather from './Weather';
import Calendar from './Calendar';
import github from '../images/gh.png';
import AppIcon from '../images/app_icon2.png';

import Particles from "react-tsparticles";

function App(props) {
    const particlesInit = (main) => {
        console.log(main);
    };

    const particlesLoaded = (container) => {
        console.log(container);
    };

    return (
        <div className="container">
            <img src={AppIcon} id="AppIcon" alt="" onClick={() => {
                        localStorage.clear()
                        window.location.reload()
                }}
            />
            <a href="https://github.com/cat-in-a-box" target="_blank" rel="noopener noreferrer">
                <img src={github} id="github" alt=''/>
            </a>
            <div className="dashboard">
                <Weather city={props.city}/>
                <Planner/>
                <Calendar/>
            </div>
            <Particles
                id={'tsparticles'} init={particlesInit} loaded={particlesLoaded}
                options={{
                    fpsLimit: 40,
                    interactivity: {
                        events: {
                            onHover: {
                                enable: false,
                                mode: "bubble",
                            },
                            resize: true,
                        },
                        modes: {
                            bubble: {
                                distance: 400,
                                duration: 2,
                                opacity: 0.085,
                                size: 18,
                            },
                            push: {
                                quantity: 1,
                            },
                            repulse: {
                                distance: 200,
                                duration: 0.5,
                            },
                        },
                    },
                    particles: {
                        color: {
                            value: "#ffffff",
                        },
                        collisions: {
                            enable: true,
                        },
                        move: {
                            direction: "none",
                            enable: true,
                            outMode: "bounce",
                            random: false,
                            speed: 0.2,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 1000,
                            },
                            value: 60,
                        },
                        opacity: {
                            value: 0.035,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            random: true,
                            value: 20,
                        },
                    },
                    detectRetina: true,
                }
            }
            />
        </div>
    )
}

export default App;
