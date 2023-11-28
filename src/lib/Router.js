import {useRouter} from 'vue-router'

export const navigateTo = (path) => {
    const route = useRouter()
    route.push(path)
}