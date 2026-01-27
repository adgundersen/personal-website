class Demo
{
    constructor(timeline)
    {
        this.step = 0;
        this.timeline = timeline;
    }

    next()
    {
        const actions = this.timeline[this.step];
        this.step += 1;
        return actions;
    }
}

export default Demo;