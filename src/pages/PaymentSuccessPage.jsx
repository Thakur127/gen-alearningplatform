import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useQuery } from "react-query";
import axiosInstance from "../api/axios";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import getSymbolFromCurrency from "currency-symbol-map";

const PaymentSuccessPage = () => {
  const [session, setSession] = useState();
  const { session_id, course_id } = useParams();

  const navigate = useNavigate();

  const {} = useQuery(
    ["checkout/session/", session_id],
    async () => {
      const res = await axiosInstance.get(
        "payments/checkout/session/" + session_id + "/line-items/"
      );
      // console.log(res)
      return res.data;
    },
    {
      onSuccess: (data) => {
        setSession(data?.data[0]);
      },
      onError: (err) => {
        navigate(-1, { replace: true });
      },
    }
  );

  if (!session) {
    return (
      <div className=" bg-gray-100 py-12 container flex">
        <Spinner size={"xl"} className="m-auto" />
      </div>
    );
  }

  // console.log(session);
  return (
    <div className="container py-12">
      <Card className="m-auto max-w-xl px-8">
        <CardHeader className="flex items-center gap-2">
          <CheckCircleIcon className="w-24 h-24 text-green-500" />
          <div>
            <h2 className="text-2xl font-bold">Transaction Successful</h2>
            <p className="text-sm">
              Your payment has been processed. Details of your payment is below!
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className="">
          <TableContainer>
            <Table>
              <Tbody>
                <Tr>
                  <Td>Course</Td>
                  <Td>{session?.description}</Td>
                </Tr>
                <Tr>
                  <Td>Price(per unit)</Td>
                  <Td>
                    {getSymbolFromCurrency(session?.currency)}
                    {session?.price.unit_amount / 100}
                  </Td>
                </Tr>
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th>Amount Subtotal</Th>
                  <Th>
                    {getSymbolFromCurrency(session?.currency)}
                    {session?.amount_subtotal / 100.0}
                  </Th>
                </Tr>
                <Tr>
                  <Th>Amount Discount</Th>
                  <Th>
                    -{getSymbolFromCurrency(session?.currency)}
                    {session?.amount_discount / 100.0}
                  </Th>
                </Tr>
                <Tr>
                  <Th className="!text-black ">Amount Total</Th>
                  <Th className="!text-black">
                    {getSymbolFromCurrency(session?.currency)}
                    {session?.amount_total / 100.0}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </TableContainer>
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

export default PaymentSuccessPage;
