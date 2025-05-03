
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip } from "recharts";

interface PaymentHistoryProps {
  data: { day: string; count: number }[];
}

export function PaymentChart({ data }: PaymentHistoryProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{fill: '#f3f4f6'}}
                contentStyle={{
                  borderRadius: '8px',
                  border: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                  padding: '8px 12px',
                }}
              />
              <Bar 
                dataKey="count" 
                fill="#4ade80" 
                radius={[4, 4, 0, 0]}
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export default PaymentChart;
