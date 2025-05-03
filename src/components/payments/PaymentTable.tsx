
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Payment } from "@/types";

interface PaymentTableProps {
  payments: Payment[];
}

export function PaymentTable({ payments }: PaymentTableProps) {
  // Format the amount with Indian Rupee symbol
  const formatAmount = (amount: number) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  // Format the date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  // Get badge color based on payment method
  const getMethodBadgeColor = (method: string) => {
    switch (method) {
      case "Credit Card":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "UPI":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100";
      case "Cash":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  // Get badge color based on payment status
  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "Pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "Failed":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">ID</TableHead>
            <TableHead>Member</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.id}</TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8 bg-primary">
                    <AvatarFallback className="text-primary-foreground">
                      {payment.memberName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{payment.memberName}</p>
                    <p className="text-xs text-muted-foreground">{payment.memberEmail}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell className="font-medium">
                {formatAmount(payment.amount)}
              </TableCell>
              <TableCell>{formatDate(payment.date)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getMethodBadgeColor(payment.method)}>
                  {payment.method}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusBadgeColor(payment.status)}>
                  {payment.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="outline">
                  View Receipt
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PaymentTable;
