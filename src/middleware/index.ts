import Pocketbase from 'pocketbase';

import { defineMiddleware } from 'astro/middleware';

export const onRequest = defineMiddleware(async ({locals, request, isPrerendered }: any, next:() => any) =>{
    locals.pb = new Pocketbase("http://127.0.0.1:8090");

    if (!isPrerendered)
    {
        locals.pb.authStore.loadFromCookie(request.headers.get('cookie') || '');
    }
    try
    {
        locals.pb.authStore.isValid && await locals.pb.collection('users').authRefresh();
    }catch (_)
    {
        locals.pb.authStore.clear();
    }

    const response = await next();

    if (!isPrerendered)
    {
        response.headers.append('set-cookie', locals.pb.authStore.exportToCookie());
    }
    
    return response;
})