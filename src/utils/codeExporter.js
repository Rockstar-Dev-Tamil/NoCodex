export const generateCode = (elements, projectName) => {
    let html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName} - Built with NoCodeX</title>
    <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&family=Orbitron:wght@700&display=swap" rel="stylesheet">
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { font-family: 'DM Sans', sans-serif; background-color: #050510; color: #e8e8ff; }
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
    </style>
</head>
<body class="min-h-screen">`;

    elements.forEach(el => {
        const style = `background-color: ${el.props.background}; color: ${el.props.color}; padding: ${el.props.padding}; font-size: ${el.props.fontSize}; border-radius: ${el.props.borderRadius};`;
        
        switch (el.type) {
            case 'Hero':
                html += `
    <section style="${style}" class="text-center py-20 px-8">
        <h1 class="text-5xl font-bold font-orbitron mb-6 uppercase tracking-wider">${el.content.title}</h1>
        <p class="text-xl max-w-2xl mx-auto opacity-80">${el.content.subtitle}</p>
    </section>`;
                break;
            case 'Text':
                html += `<div style="${style}" class="max-w-4xl mx-auto my-12 px-8 leading-relaxed">${el.content.text}</div>`;
                break;
            case 'Navbar':
                html += `
    <nav style="${style}" class="flex justify-between items-center py-6 px-12 border-b border-white/10 sticky top-0 backdrop-blur-md z-50">
        <div class="text-2xl font-bold font-orbitron uppercase tracking-widest text-cyan-400">${el.content.logo}</div>
        <div class="flex gap-8 text-sm font-bold uppercase tracking-widest">
            ${el.content.links.map(l => `<a href="#" class="hover:text-cyan-400 transition-colors">${l}</a>`).join('')}
        </div>
    </nav>`;
                break;
            case 'Image':
                html += `<div style="${style}" class="flex justify-center my-12 px-8"><img src="${el.content.src}" alt="${el.content.alt}" class="max-w-full rounded-2xl shadow-2xl"></div>`;
                break;
            case 'CardGrid':
                html += `
    <div style="${style}" class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto px-8 my-20">
        ${el.content.items.map(item => `
        <div class="p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl hover:border-cyan-400 transition-all group">
            <h3 class="text-2xl font-bold font-orbitron mb-4 uppercase tracking-widest text-cyan-400">${item.title}</h3>
            <p class="text-secondary leading-relaxed">${item.desc}</p>
        </div>`).join('')}
    </div>`;
                break;
            case 'Video':
                html += `<div style="${style}" class="max-w-5xl mx-auto aspect-video mb-12 px-8"><iframe src="${el.content.url}" class="w-full h-full rounded-3xl shadow-2xl" allowfullscreen></iframe></div>`;
                break;
            case 'Footer':
                html += `<footer style="${style}" class="py-12 px-8 text-center text-sm font-bold uppercase tracking-widest opacity-60 border-t border-white/10 mt-20">${el.content.text}</footer>`;
                break;
            case 'Divider':
                html += `<hr class="max-w-4xl mx-auto my-12 border-white/10">`;
                break;
            case 'Spacer':
                html += `<div class="h-10"></div>`;
                break;
        }
    });

    html += `</body>\n</html>`;
    return html;
};
