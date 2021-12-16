
function sortNodesAndChildren(nodes: any, cmp?: any) {
    if(Array.isArray(nodes)){
        nodes.sort(cmp);
        nodes.forEach((node) => {
            if (node.children) {
                sortNodesAndChildren(node.children, cmp);
            }
        });
    } else {
        if (nodes && nodes.children) {
            sortNodesAndChildren(nodes.children, cmp);
        }
    }
}
export default sortNodesAndChildren;