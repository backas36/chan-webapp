import { Box, Stack, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"
import { PieChart, Pie, Cell, Tooltip } from "recharts"
const data = [
  { name: "Group A", value: 400 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group B", value: 300 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"]
const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}
const InventoryChart = () => {
  const { t } = useTranslation()
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        flexFlow: "wrap",
        width: "100%",
      }}
    >
      <PieChart width={200} height={200}>
        <Pie
          data={data}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
      <Stack gap={1}>
        <Typography variant="h6">{t("inventories")}</Typography>
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
          {COLORS.map((color, i) => (
            <Stack key={color} alignItems="center" spacing={1}>
              <Box sx={{ width: 20, height: 20, background: color }} />
              <Typography variant="body2" sx={{ opacity: 0.7 }}>
                {
                  [
                    {
                      name: t("butter"),
                      numbers: 1,
                    },

                    {
                      name: t("milk"),
                      numbers: 3,
                    },
                    {
                      name: t("egg"),
                      numbers: 50,
                    },
                    {
                      name: t("driedStrawberries"),
                      numbers: 2,
                    },
                  ][i]?.name
                }
              </Typography>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Box>
  )
}

export default InventoryChart
