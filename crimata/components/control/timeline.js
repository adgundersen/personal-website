import { loadB64, contactToHTML } from "./helpers.js";

const timeline = [
    [
        {
            time: 1,
            name: "account",
            data: "adgundersen@gmail.com"
        },
        {
            time: 1,
            name: "ws",
            data: true
        },
        {
            time: 2,
            name: "ws",
            data: false
        },
        {
            time: 2,
            name: "message",
            data: {
                name: "Andrew Gundersen"
            }
        },
        {
            time: 2,
            name: "message",
            data: {
                id: 1,
                context: 'Crimata AI',
                modifier: 'ai',
                avatar: await loadB64("assets/demo/crimata.png"),
                content: [
                    {
                        category: 'text',
                        text: 'Hi Andrew Gundersen.',
                    }
                ]
            }
        },
        {
            time: 3,
            name: "note",
            data: {
                title: "A new session with Crimata",
                content: "Welcome to Crimata Messenger, a desktop app that allows you to interact with Crimata AI, a new digital assistant that makes communicating with your colleagues easier. Just start by talking.",
                nextWording: "Next",
                control: {
                    anchor: "bubble-1-0",
                    x: -10,
                    y: 27,
                    right: false,
                },
                id: 0
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                id: 2,
                modifier: 'client',
                content: [
                    {
                        category: 'text',
                        text: 'Add Enrique Hernandez to my contacts.',
                    }
                ]
            }
        },
        {
            time: 1,
            name: "message",
            data: {
                message: 2,
                context: "Add Contact" 
            }
        },
        {
            time: 2,
            name: "note",
            data: {
                title: "Message Annotations",
                content: "Crimata transcribes your message and then labels them (e.g. 'Add Contact').",
                nextWording: "Next",
                control: {
                    anchor: "context-2",
                    x: -25,
                    y: 0,
                    right: false,
                },
                id: 1
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                id: 3,
                context: 'Add Contact',
                modifier: 'ai',
                avatar: await loadB64("assets/demo/contacts.png"),
                content: [
                    {
                        category: 'text',
                        text: "Okay, what is Enrique's email?",
                    }
                ]
            }
        },
        {
            time: 1,
            name: "note",
            data: {
                title: "Type complex messages",
                content: "For entering complex messages such as an email, feel free to type them.",
                nextWording: "Next",
                control: {
                    anchor: "input",
                    x: -5,
                    y: -5,
                    right: false,
                },
                id: 2
            }
        }
    ],
    [
        {
            time: 0,
            name: "type",
            data: "hernandeze2@crimata.com"
        },
        {
            time: 3,
            name: "message",
            data: {
                id: 4,
                modifier: 'client',
                content: [
                    {
                        category: 'text',
                        text: "hernandeze2@crimata.com",
                    }
                ]
            }
        },
        {
            time: 4,
            name: "message",
            data: {
                message: 4,
                context: "Add Contact"
            }
        },
        {
            time: 5,
            name: "message",
            data: {
                id: 5,
                modifier: 'ai',
                context: "Add Contact",
                avatar: await loadB64("assets/demo/contacts.png"),
                content: [
                    {
                        category: 'text',
                        text: "Drag and drop a photo for Enrique."
                    }
                ]
            }
        },
        {
            time: 7,
            name: "message",
            data: {
                id: 6,
                modifier: 'client',
                content: [
                    {
                        category: 'image',
                        blob: await loadB64("assets/demo/enrique.png")
                    }
                ]
            }
        },
        {
            time: 8,
            name: "message",
            data: {
                message: 6,
                context: "Add Contact"
            }
        },
        {
            time: 9,
            name: "note",
            data: {
                title: "Drag and Drop Attatchments",
                content: "Crimata can also classify attatchments.",
                nextWording: "Next",
                control: {
                    anchor: "context-6",
                    x: -25,
                    y: 0,
                    right: false,
                },
                id: 3
            }
        }
    ],
    [

        {
            time: 0,
            name: "message",
            data: {
                id: 7,
                modifier: 'ai',
                context: "Add Contact",
                avatar: await loadB64("assets/demo/contacts.png"),
                content: [
                    {
                        category: 'html',
                        html: await contactToHTML("Enrique Hernandez", 
                            "hernandeze@crimata.com", 
                            "assets/demo/enrique_thumb.png"),
                    }
                ]
            }
        },
        {
            time: 1,
            name: "note",
            data: {
                title: "Parsing Conversation",
                content: "We just added a new contact. Every message relating to that task was labeled 'Add Contact'.",
                nextWording: "Next",
                control: {
                    anchor: "context-7",
                    x: 110,
                    y: 2,
                    right: false,
                },
                id: 4
            }
        }
    ],
    [
        {
            time: 0,
            name: "record",
            data: true,
        },
        {
            time: 2,
            name: "record",
            data: false,
        },
        {
            time: 3,
            name: "message",
            data: {
                id: 8,
                modifier: 'client',
                content: [
                    {
                        category: 'text',
                        text: "Hey Enrique, what time is the meeting today?"
                    }
                ]
            }
        },
        {
            time: 4,
            name: "note",
            data: {
                title: "Automatic messaging",
                content: "Crimata's flagship feature allows you to directly talk to your friends.",
                nextWording: "Next",
                control: {
                    anchor: "bubble-8-0",
                    x: -5,
                    y: -5,
                    right: false,                    
                },
                id: 5,
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                message: 8,
                context: "To Enrique Hernandez"
            }
        },
        {
            time: 1,
            name: "note",
            data: {
                title: "Annotation for messages",
                content: "Crimata guesses the recipient automatically (e.g. 'To Enrique Hernandez').",
                nextWording: "Next",
                control: {
                    anchor: "context-8",
                    x: -25,
                    y: -0,
                    right: false,
                },
                id: 6,
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                id: 9,
                modifier: 'ai',
                context: "From Enrique Hernandez",
                avatar: await loadB64("assets/demo/enrique_thumb.png"),
                content: [
                    {
                        category: 'text',
                        text: "5pm"
                    }
                ]
            }
        },
        {
            time: 0,
            name: "playback",
            data: {
                id: 9,
                status: true
            }
        },
        {
            time: 1,
            name: "message",
            data: {
                message: 9,
                category: "text",
                text: "Also, could you send me the deck?"
            }
        },
        {
            time: 2,
            name: "message",
            data: {
                message: 9,
                category: "text",
                text: "I need to double check the numbers."
            }
        },
        {
            time: 3,
            name: "playback",
            data: {
                id: 9,
                status: false
            }
        },
        {
            time: 4,
            name: "note",
            data: {
                title: "Inbound Messages",
                content: "Inbound messages from friends are displayed like so. Audio messages can be played automatically and are denoted by the animating profile.",
                nextWording: "Next",
                control: {
                    anchor: "context-9",
                    x: 180,
                    y: 2,
                    right: false,
                },
                id: 7,
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                id: 10,
                modifier: 'client',
                content: [
                    {
                        category: 'text',
                        text: "Here you go!",
                    }
                ]
            }
        },
        {
            time: 1,
            name: "message",
            data: {
                message: 10,
                category: 'application/pdf',
                text: "crimata_deck.pdf",
                blob: await loadB64("assets/demo/crimata_deck.pdf")
            }
        },
        {
            time: 2,
            name: "message",
            data: {
                message: 10,
                context: "To Enrique Hernandez"
            }
        },
        {
            time: 4,
            name: "message",
            data: {
                id: 11,
                modifier: "ai",
                context: "From Enrique Hernandez",
                avatar: await loadB64("assets/demo/enrique_thumb.png"),
                content: [
                    {
                        category: "text",
                        text: "Our team should carpool to the meeting!"
                    }
                ]
            }
        },
        {
            time: 5,
            name: "message",
            data: {
                id: 12,
                modifier: "client",
                content: [
                    {
                        category: "text",
                        text: "For sure. Let me ask Landon."
                    }
                ]
            }
        },
        {
            time: 6,
            name: "message",
            data: {
                message: 12,
                context: "To Enrique Hernandez",
            }
        },
        {
            time: 7,
            name: "message",
            data: {
                id: 13,
                modifier: "client",
                content: [
                    {
                        category: "text",
                        text: "Hey Landon do you want to carpool with Enrique and I?"
                    }
                ]
            }
        },
        {
            time: 8,
            name: "message",
            data: {
                message: 13,
                context: "To Landon Clark",
            }
        },
        {
            time: 9,
            name: "note",
            data: {
                title: "More Complex Dialoge",
                content: "Talk to two people at once. Crimata will route the messages accordingly.",
                nextWording: "Next",
                control: {
                    anchor: "context-13",
                    x: -25,
                    y: 0,
                    right: false,
                },
                id: 8,
            }
        }
    ],
    [
        {
            time: 0,
            name: "message",
            data: {
                id: 14,
                modifier: "ai",
                context: "From Landon Clark",
                avatar: await loadB64("assets/demo/landon_thumb.png"),
                content: [
                    {
                        category: "text",
                        text: "Let's do it!"
                    }
                ]
            }
        },
        {
            time: 1,
            name: "message",
            data: {
                message: 14,
                category: "text",
                text: "I can pick you guys up at 4pm."
            }
        },
        {
            time: 2,
            name: "message",
            data: {
                id: 15,
                modifier: "client",
                content: [
                    {
                        category: "text",
                        text: "He said he's down."
                    }
                ]
            }
        },
        {
            time: 3,
            name: "message",
            data: {
                message: 15,
                category: "text",
                text: "He'll be coming around 4pm."
            }
        },
        {
            time: 4,
            name: "message",
            data: {
                message: 15,
                context: "To Enrique Hernandez"
            }
        },
        {
            time: 5,
            name: "message",
            data: {
                id: 16,
                modifier: "ai",
                avatar: await loadB64("assets/demo/enrique_thumb.png"),
                context: "From Enrique Hernandez",
                content: [
                    {
                        category: "text",
                        text: "Sweet!"
                    }
                ]
            }
        },
        {
            time: 6,
            name: "note",
            data: {
                title: "Conclusion",
                content: "Crimata is a powerful tool for communication and productivity. Effortlessly talk to your friends like they are in the same room. Simultaneously get things done with an intuitive digital assistant. It's time improve our communication.",
                nextWording: "Done",
                control: {
                    anchor: "bubble-16-0",
                    x: -10,
                    y: 27,
                    right: false,
                },
                id: 9,
            }
        }
    ],

]

export default timeline;

