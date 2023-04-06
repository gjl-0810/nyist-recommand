

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
export { LOGIN_STATUS_MAP, STATUS_MAP };
export type { STATUS_MAP_TYPE, MessageStatus };
