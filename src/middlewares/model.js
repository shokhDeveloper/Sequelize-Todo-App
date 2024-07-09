export const model = (req, _, next) => {
    req.parse = function(val){
        let data = JSON.stringify(val);
        return JSON.parse(data)
    };
    return next();
}