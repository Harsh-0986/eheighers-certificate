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
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import moment from "moment";
import { Timestamp as TimeStampType } from "@firebase/firestore-types";
import { DeleteIcon } from "lucide-react";
import { buttonVariants } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { cn } from "../../lib/utils";

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

  const deleteEntry = async (id: string) => {
    if (id === "") return;

    await deleteDoc(doc(db, "EventCertificates", id));
    location.reload();
  };

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
            <TableRow key={certificate.id}>
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
                <AlertDialog>
                  <AlertDialogTrigger
                    className={cn(buttonVariants({ variant: "destructive" }))}
                  >
                    <DeleteIcon className="w-4 h-4" />
                  </AlertDialogTrigger>

                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove your data from our
                        servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => deleteEntry(certificate["id"] || "")}
                      >
                        Continue
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default CertificatesTable;
