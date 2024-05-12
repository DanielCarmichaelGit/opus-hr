import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "UI Designer",
    administered: 4000,
    passed: 2400,
    failed: 1600,
  },
  {
    name: "Adobe Editor",
    administered: 4000,
    passed: 1398,
    failed: 2608,
  },
  {
    name: "Python Dev",
    administered: 4000,
    passed: 1400,
    failed: 2600,
  },
  {
    name: "Animator",
    administered: 4000,
    passed: 92,
    failed: 3908,
  },
  {
    name: "Illustrator",
    administered: 4000,
    passed: 150,
    failed: 3850,
  },
  {
    name: "Editor",
    administered: 4000,
    passed: 680,
    failed: 3320,
  },
  {
    name: "UI Designer",
    administered: 4000,
    passed: 700,
    failed: 3300,
  },
];

export default function OpusAreaChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="administered"
          stackId="1"
          stroke="#8884d8"
          fill="#8884d8"
        />
        <Area
          type="monotone"
          dataKey="passed"
          stackId="1"
          stroke="#82ca9d"
          fill="#82ca9d"
        />
        <Area
          type="monotone"
          dataKey="failed"
          stackId="1"
          stroke="#ffc658"
          fill="#ffc658"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
