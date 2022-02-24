
import request from './request.js'

export async function getAssociateWords(content){
    const res = await request.get('https://api.codelife.cc/api/baidu_sugrec/' + content);
    // const res = await request.get('https://www.baidu.com/sugrec?wd=' + content);

    return res;
}