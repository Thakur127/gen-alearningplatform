import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@chakra-ui/react";
import { XCircleIcon } from "@heroicons/react/24/outline";

const PaymentFailedPage = () => {
  const { course_id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="container py-12">
      <Card className="m-auto max-w-xl">
        <CardHeader className="flex items-center">
          <XCircleIcon className="w-24 h-24 text-red-500" />
          <div>
            <h2 className="text-2xl font-bold">Transaction Cancelled</h2>
            <p className="text-sm">
              Due to some unknown reasons your payment cancelled
            </p>
          </div>
        </CardHeader>
        <CardBody>
          <p>
            If any amount is deducted from your account, it will be refunded to
            you in next 2-3 working days
          </p>
        </CardBody>
        <CardFooter className="gap-2">
          <Button
            variant={"outline"}
            onClick={() => {
              navigate("/dashboard", { replace: true });
            }}
          >
            Dashboard
          </Button>
          <Button
            variant={"primary"}
            onClick={() => {
              navigate(`/course/${course_id}`, { replace: true });
            }}
          >
            Back to the course
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentFailedPage;
