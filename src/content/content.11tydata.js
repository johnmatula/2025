module.exports = {
   eleventyComputed: {
     breadcrumb: function ({ permalink, title = '', hideBreadcrumb }) {
         
       if (!permalink || hideBreadcrumb) {
         return
       }

       const segments = permalink.replace(/^\/|\/$/g, '').split('/')
       // Initiate with a {url, name} object, e.g. to add a home node
       const breadcrumb = []

       let index = 1
       let accumulatedPath = ''

       for (const segment of segments) {
         if(segment == "index.html") continue
         accumulatedPath += '/' + segment

         breadcrumb.push({
           url: `${accumulatedPath}/`,
           name:
             index === segments.length && title
               ? title
               : segment.toTitleCase(), //see .eleventy.js for implementation
         })

         index++
       }

       return breadcrumb
     },
   },
 }