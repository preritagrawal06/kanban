export const generateSlug = (title: string, projectId: string)=>{
    return `${title.toLowerCase().trim().split(" ").join("-")}-${projectId}`
}