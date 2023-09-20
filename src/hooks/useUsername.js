export default function useUsername(name = '') {
    return name.replace(/ /g, '%20').replace(/#/g, '/')
}