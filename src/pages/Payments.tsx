
import { useState, useEffect } from "react";
import { fetchPayments } from "@/lib/api";
import MainLayout from "@/components/layout/MainLayout";
import PaymentChart from "@/components/payments/PaymentChart";
import PaymentTable from "@/components/payments/PaymentTable";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Payment } from "@/types";
import { CreditCard, Download, Printer } from "lucide-react";
import { toast } from "sonner";

const Payments = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Dummy data for the chart
  const paymentHistoryData = [
    { day: "Mon", count: 5000 },
    { day: "Tue", count: 6000 },
    { day: "Wed", count: 5500 },
    { day: "Thu", count: 4500 },
    { day: "Fri", count: 6500 },
    { day: "Sat", count: 7500 },
    { day: "Sun", count: 6800 },
  ];

  // Calculate payment stats
  const calculatePaymentStats = () => {
    let totalRevenue = 0;
    let paymentCount = 0;
    const methodCounts = { card: 0, upi: 0, cash: 0 };
    const statusCounts = { completed: 0, pending: 0, failed: 0 };

    payments.forEach(payment => {
      totalRevenue += payment.amount;
      paymentCount++;

      if (payment.method === "Credit Card") methodCounts.card++;
      else if (payment.method === "UPI") methodCounts.upi++;
      else if (payment.method === "Cash") methodCounts.cash++;

      if (payment.status === "Completed") statusCounts.completed++;
      else if (payment.status === "Pending") statusCounts.pending++;
      else if (payment.status === "Failed") statusCounts.failed++;
    });

    return {
      totalRevenue,
      paymentCount,
      methodCounts,
      statusCounts
    };
  };

  const stats = calculatePaymentStats();

  useEffect(() => {
    const loadPayments = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPayments();
        setPayments(data);
      } catch (error) {
        console.error("Failed to load payments:", error);
        toast.error("Failed to load payments");
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, []);

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Payments</h1>
          <p className="text-muted-foreground">Track and manage all payment transactions</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
          <Button variant="outline">
            <Printer className="mr-2 h-4 w-4" /> Print
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <h3 className="text-2xl font-bold">₹72,000</h3>
              <p className="text-xs text-muted-foreground">Payment Count: {stats.paymentCount}</p>
            </div>
          </CardContent>
        </Card> 
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Payment Methods</p>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-lg font-bold">{stats.methodCounts.card}</p>
                <p className="text-xs text-muted-foreground">Card</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{stats.methodCounts.upi}</p>
                <p className="text-xs text-muted-foreground">UPI</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold">{stats.methodCounts.cash}</p>
                <p className="text-xs text-muted-foreground">Cash</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground mb-2">Payment Status</p>
            <div className="flex justify-between">
              <div className="text-center">
                <p className="text-lg font-bold text-green-600">{stats.statusCounts.completed}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-yellow-600">{stats.statusCounts.pending}</p>
                <p className="text-xs text-muted-foreground">Pending</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-red-600">{stats.statusCounts.failed}</p>
                <p className="text-xs text-muted-foreground">Failed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mb-8">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5" />
          <h2 className="text-lg font-semibold">Payment History</h2>
          <select className="ml-auto border rounded-md p-1 px-2 text-sm">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>
        <PaymentChart data={paymentHistoryData} />
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Transactions</h2>
          <Button variant="outline" size="sm">
            Filter
          </Button>
        </div>
        <PaymentTable payments={payments} />
      </div>
    </MainLayout>
  );
};

export default Payments;
