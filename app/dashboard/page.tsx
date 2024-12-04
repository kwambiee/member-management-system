import { Profile, columns } from "../../components/ui/columns"
import { DataTable } from "./data-table"
import MembershipChart from "./chart"
import StatisticCard from "./statistics"
import ActivityLogs from "./activity-logs"

 export async function getData(): Promise<Profile[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "Jane Doe",
      email: "jane@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1990-01-01",
    },
    {
      id: "728ed530",
      name: "John Smith",
      email: "john@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1985-05-15",
    },
    {
      id: "728ed531",
      name: "Alice Johnson",
      email: "alice@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1992-07-21",
    },
    {
      id: "728ed532",
      name: "Bob Brown",
      email: "bob@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1988-11-30",
    },
    {
      id: "728ed533",
      name: "Charlie Davis",
      email: "charlie@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1995-03-12",
    },
    {
      id: "728ed534",
      name: "Diana Evans",
      email: "diana@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1991-08-25",
    },
    {
      id: "728ed535",
      name: "Eve Foster",
      email: "eve@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1989-12-05",
    },
    {
      id: "728ed536",
      name: "Frank Green",
      email: "frank@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1993-04-18",
    },
    {
      id: "728ed537",
      name: "Grace Harris",
      email: "grace@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1994-09-09",
    },
    {
      id: "728ed538",
      name: "Henry Jackson",
      email: "henry@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1987-02-22",
    },
    {
      id: "728ed539",
      name: "Ivy King",
      email: "ivy@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1996-06-14",
    },
    {
      id: "728ed53a",
      name: "Jack Lee",
      email: "jack@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1990-10-10",
    },
    {
      id: "728ed53b",
      name: "Kathy Miller",
      email: "kathy@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1986-01-29",
    },
    {
      id: "728ed53c",
      name: "Leo Nelson",
      email: "leo@gmail.com",
      role: "member",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1991-11-11",
    },
    {
      id: "728ed53d",
      name: "Mia Owens",
      email: "mia@gmail.com",
      role: "admin",
      profile: {
        avatar: "https://api.dicebear.com/9.x/avataaars/svg"
      },
      dateOfBirth: "1993-03-03",
    },
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <StatisticCard />
      <div className="flex gap-x-4">
  <div className="w-3/4">
    <MembershipChart />
  </div>
  <div className="w-1/4">
    <ActivityLogs />
  </div>
</div>
      
      <DataTable columns={columns} data={data} />
    </div>
  )
}
