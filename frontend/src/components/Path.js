const app_name = 'solo-mern-53f3fb57a45c'
exports.buildPath = 
function buildPath(route)
{
    console.log("path");
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
}
