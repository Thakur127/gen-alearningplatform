import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Spinner,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import getSymbolFromCurrency from "currency-symbol-map";
import { replace } from "formik";

const PaymentCompletedPage = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (
      !(
        params.get("status") &&
        params.get("course_name") &&
        params.get("course_id") &&
        params.get("currency") &&
        params.get("amount")
      )
    ) {
      navigate(-1, { replace: true });
    }
  }, [params]);

  if (
    !(
      params.get("status") &&
      params.get("course_name") &&
      params.get("course_id") &&
      params.get("currency") &&
      params.get("amount")
    )
  ) {
    return (
      <div className="aboslute inset-0 flex h-full justify-center mt-12">
        <Spinner size={"lg"} />
      </div>
    );
  }

  return (
    <div className="py-10">
      <Card maxWidth={"400px"} margin={"auto"}>
        <CardHeader>
          <h2 className="font-semibold text-xl">
            {params.get("status") === "success" ? (
              <span className="text-green-500">Transaction Success</span>
            ) : (
              params.get("status") === "failed" && (
                <span className="text-red-500">Transaction Failed</span>
              )
            )}
          </h2>
        </CardHeader>
        <CardBody paddingY={"0"} className="space-y-2">
          <p>
            Your transaction of amount{" "}
            <span className="font-medium">
              {getSymbolFromCurrency(params.get("currency"))}
              {params.get("amount")}
            </span>{" "}
            {params.get("status")} for the course{" "}
            <Link to={`/course/${params.get("course_id")}/`}>
              <span className="font-medium underline underline-offset-2">
                {params.get("course_name")}
              </span>
            </Link>
          </p>
        </CardBody>
        <CardFooter>
          <Button
            variant={"primary"}
            onClick={() => {
              navigate(`/dashboard`, {
                replace: true,
              });
            }}
          >
            Go to dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentCompletedPage;
