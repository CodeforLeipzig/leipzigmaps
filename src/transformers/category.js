import fs from 'fs';

const categories = [];

const atts = [
    'kategorie', 'rubrik', 'merkmal_1', 
    'merkmal_2', 'merkmal_3', 'merkmal_4'
]
const root = './public/data-raw/';
var files = fs.readdirSync(root);
for (var file of files) {
    const content = JSON.parse(fs.readFileSync(root + file));
    for (var elem of content.data) {
        const category = {};
        for (var att of atts) {
            category[att] = elem[att]
        }
        category['data'] = file.replace('.json', '').substring('leipzig-'.length);
        categories.push(category)
    }
}


const collectCategories = (cats, attribs, index) => {
    const categoryTree = {};
    const att = attribs[index];
    const attElems = new Set(cats.map(cat => cat[att]).filter(cat => !!cat))
    for (var attElem of attElems) {
        const subCats = cats.filter(cat => cat[att] == attElem);
        if (subCats.length > 0 && index < attribs.length -1) {
            categoryTree[attElem] = collectCategories(subCats, attribs, index+1);
        }
        if (!categoryTree[attElem] || Object.keys(categoryTree[attElem]).length == 0) {
            categoryTree[attElem] = {
                data: Array.from(new Set(cats.map(cat => cat['data'])))
            };
        }
    }
    return categoryTree;
}

const categoryTree = collectCategories(categories, atts, 0);

console.log(JSON.stringify(categoryTree, null, 2));