import * as request from '../lib/request'


const baseUrl = 'http://localhost:3030/data/comments';

export const getAll = async (playerId) => {

    const query = new URLSearchParams({
        where: `playerId = "${playerId}"`,
        load: `owner=_ownerId:users`
    })

     const result = await request.get(`${baseUrl}?${query}`)

     return result

}
export const create = async (playerId, text) => {
    const newComment = await request.post(baseUrl, {
        playerId,
        text,
    });

    return newComment;
};