interface IGameBoard {
    IdGame: number,
    Type: string,
    GameName: string,
    URLImage?: string,
    Description?: string,
   Yearpublished?: string,
   Minplayers?: string,
   Maxplayers?: string
}
const BggApi = {
    getGameByID: async (id:number) : Promise<IGameBoard> =>{
        const req = new XMLHttpRequest();
        req.open("GET", `https://www.boardgamegeek.com/xmlapi2/thing?id=${id}`, false);
        req.send();
        const XMLDoc = req.responseXML;    
        return {
            IdGame: Number.parseInt(XMLDoc.getElementsByTagName('item')[0].getAttribute('id')),
            Type: XMLDoc.getElementsByTagName('item')[0].getAttribute('type'),
            GameName: XMLDoc.getElementsByTagName('name')[0].getAttribute('value'),
            URLImage: XMLDoc.getElementsByTagName('image')[0].innerHTML,
            Description: XMLDoc.getElementsByTagName('image')[0].innerHTML,
            Yearpublished: XMLDoc.getElementsByTagName('yearpublished')[0]?.getAttribute('value') || "",
            Minplayers: XMLDoc.getElementsByTagName('minplayers')[0]?.getAttribute('value') || "",
            Maxplayers: XMLDoc.getElementsByTagName('maxplayers')[0]?.getAttribute('value') || ""
        }
    },
    getGamesBySearch:async (search:string, maxCount:number = 10) => {
        const req = new XMLHttpRequest();
        req.open("GET", `https://boardgamegeek.com/xmlapi2/search?query=${search}&type=boardgame`, false);        
        req.send();
        const XMLDoc = req.responseXML;    
        const gameslist = XMLDoc.getElementsByTagName('item');        
        const res = new Array<IGameBoard>();       
        for (let index = 0; index < gameslist.length && index < maxCount; index++) {
            const element:Element = gameslist.item(index);
            res.push({
                IdGame: Number.parseInt(element.getAttribute('id')),
                GameName: element.getElementsByTagName('name')[0].getAttribute('value'),
                Type: element.getAttribute('type'),
                Yearpublished: element.getElementsByTagName('yearpublished')[0]?.getAttribute('value') || ""
            });
        }
        return res;
    }
};
export { BggApi };
export type { IGameBoard };
