import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import moment from "moment";
import { Timestamp as TimeStampType } from "@firebase/firestore-types";

type Certificate = {
  "Event Name": string;
  "Issued On": TimeStampType;
  Name: string;
  Role: string;
  "Roll Number": string;
  id?: string;
  ""?: string;
};

const CertificatesTable = () => {
  const headerKeys = ["Event Name", "Issued On", "Name", "Role", "Roll Number"];

  const [certificates, setCertificates] = useState<null | Certificate[]>();

  useEffect(() => {
    async function getCertificates() {
      const certificateRef = await getDocs(collection(db, "EventCertificates"));
      const certificateRecords: Certificate[] | [] = [];

      certificateRef.forEach((doc) => {
        const data = doc.data();
        const certificate = { id: doc.id, ...data };
        //@ts-ignore
        certificateRecords.push(certificate);
      });

      setCertificates(certificateRecords);
    }

    getCertificates();
  }, []);

  return (
    <Table className="w-[calc(100vw - 8rem)] overflow-scroll">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow key={"header"}>
          {headerKeys.map((key) => (
            <TableHead className="w-[100px]">{key}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates?.map((certificate) => {
          console.log(certificate);
          return (
            <TableRow>
              <TableCell>{certificate["Event Name"]}</TableCell>
              <TableCell>
                {moment(certificate["Issued On"].seconds * 1000).format(
                  "MMMM Do YYYY"
                )}
              </TableCell>
              <TableCell>{certificate["Name"]}</TableCell>
              <TableCell>{certificate["Role"]}</TableCell>
              <TableCell>{certificate["Roll Number"]}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CertificatesTable;
