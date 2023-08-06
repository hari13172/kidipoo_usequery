
class Lib{
    add(num){
        return add(num)
    }
    sub(num){
        return sub(num)
    }
    mul(num){
        return mul(num)
    }
}

export default new Lib
    

export function add(num){
    return num + 1
}

export function sub(num){
    return num - 1
}

export function mul(num){
    return num * 10
}