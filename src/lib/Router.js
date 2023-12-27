import {useRouter} from 'vue-router'

export const navigateTo = (path) => {
    const route = useRouter()
    return route.push(path)
}