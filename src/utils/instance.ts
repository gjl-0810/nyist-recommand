

const STATUS_JOB = '求职者';
const STATUS_RECOMMOD = '内推者';

interface Status{
    [index:number] :string,
    100:'success',
    101:'success',
    103:'error',
    104:'error',
}
type MessageStatus = "success" | "warning" | "info" | "error";
const LOGIN_STATUS_MAP:Status ={
    100:'success',
    101:'success',
    103:'error',
    104:'error',
}
type STATUS_MAP_TYPE = {
    label: number;
    value: string;
}[]
const STATUS_MAP = [
    { label: 0, value: STATUS_JOB},
    { label: 1, value: STATUS_RECOMMOD},
]
const STEP_TO_STATUS:{[index:string]:number}={
    '已投递':1,
    '面试中':2,
    'offer':3,
    '结束':4,
}
const TO_STATUS:{[index:number]:string}={
    1:'已投递',
    2:'面试中',
    3:'offer',
    4:'结束',
}
export { LOGIN_STATUS_MAP, STATUS_MAP, TO_STATUS,STEP_TO_STATUS };
export type { STATUS_MAP_TYPE, MessageStatus };
