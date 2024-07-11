import {
  Table,
  TableBody,
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
import { DeleteIcon, Edit } from "lucide-react";
import { Button } from "../ui/button";

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
  const headerKeys = [
    "ID",
    "Event Name",
    "Issued On",
    "Name",
    "Role",
    "Roll Number",
  ];

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
      <TableHeader>
        <TableRow key={"header"}>
          <TableHead className="w-[100px]">S. no</TableHead>
          {headerKeys.map((key) => (
            <TableHead className="w-[100px]">{key}</TableHead>
          ))}
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {certificates?.map((certificate, idx) => {
          return (
            <TableRow>
              <TableCell className="truncate">{idx + 1}</TableCell>
              <TableCell className="truncate">{certificate["id"]}</TableCell>
              <TableCell className="truncate">
                {certificate["Event Name"]}
              </TableCell>
              <TableCell className="truncate">
                {moment(certificate["Issued On"].seconds * 1000).format(
                  "MMMM Do YYYY"
                )}
              </TableCell>
              <TableCell className="truncate">{certificate["Name"]}</TableCell>
              <TableCell className="truncate">{certificate["Role"]}</TableCell>
              <TableCell className="truncate">
                {certificate["Roll Number"]}
              </TableCell>
              <TableCell className="flex gap-2">
                <Button variant="outline">
                  <Edit className="w-4 h-4" />
                </Button>
                <Button variant="destructive">
                  <DeleteIcon className="w-4 h-4" />
                </Button>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CertificatesTable;
