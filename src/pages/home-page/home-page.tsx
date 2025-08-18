import { dateFormat } from '@/libs'

export const Home = () => {
  return <div className="bg-red-300">{dateFormat(new Date(2024, 5, 16), 'yyyy-MM-dd')}</div>
}
