import Logger from "../utils/Logger";


export function parseAndLogRoute(state){
    if(!state){
        Logger.info('No navigation state available');
        return;
    }

    const {routes,index} = state;
    const currentRoute = routes[index];

    Logger.info('Current Route', {
        name: currentRoute.name,
        params: currentRoute.params || {}
    });
}

export function setIsNavigationReady(){
    Logger.info(`Navigation is now ready`);
}