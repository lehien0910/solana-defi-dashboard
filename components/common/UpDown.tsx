import { formatNumber } from '../../utils'

type UpDownProps = {
  value: number;
}

export default function UpDown({ value }: UpDownProps) {
  if (!value) return null

  if (value > 0) return <span style={{color: '#4caf50', fontSize: '12px'}}>+{formatNumber(Math.abs(value), 2)}&#37;</span>
  
  return <span style={{color: '#f44336', fontSize: '12px'}}>-{formatNumber(Math.abs(value), 2)}&#37;</span>
}