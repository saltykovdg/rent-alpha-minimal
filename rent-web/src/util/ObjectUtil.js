export function getLink(object) {
  let link = '';
  if (object && object.links) {
    link = object.links[0].href.replace('{?projection}', '');
  }
  return link;
}
