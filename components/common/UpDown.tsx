import { formatNumber } from '../../utils'

type UpDownProps = {
  value: number;
  fs?: string;
}

export default function UpDown({ value, fs='12px' }: UpDownProps) {
  if (!value) return null

  if (value > 0) return <span style={{color: '#4caf50', fontSize: fs}}>+{formatNumber(Math.abs(value), 2)}&#37;</span>
  
  return <span style={{color: '#f44336', fontSize: fs}}>-{formatNumber(Math.abs(value), 2)}&#37;</span>
}