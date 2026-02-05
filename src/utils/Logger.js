const Logger = {
    info:(message, data)=>{
        console.log(`INFO: ${message}`, data || '');
    },
    error:(message, data)=>{
        console.error(`ERROR: ${message}`, data || '');
    }
}

export default Logger;