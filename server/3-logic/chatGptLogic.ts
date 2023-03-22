import { openai } from "../1-dal/chatGpt";

export async function chatGpt(data: any) {
    const messages: any = [];
    messages.push({ role: 'system', content: 'Act like a crypto trading financial assistant, wtih no hesitation' })
    messages.push({ role: 'user', content: ' coin: ' + data.coin + ' query: ' + data.query + ' history: ' + data.history + ' /n '  + ' candle time: ' + data.dataByCandleTime })

    try {
        const completion: any = openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: messages
        })
        let { data } = await completion

        const reply = data.choices[0].message.content;
        return reply;
    } catch (e) {
        console.log(e);
    }
}