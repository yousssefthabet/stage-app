"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Input } from "../../ui/input";
import { Checkbox } from "../../ui/checkbox";
import { Textarea } from "../../ui/textarea";
import { MessageSquareText } from "lucide-react";
import { type HeaderProjet } from "../../apis/types/header-projet-type";
import { useUsers } from "../../apis/modules/user/user-queries";
import { useSubStepByStepId } from "../../apis/modules/pipeline/pipeline-subsep-mutation";
import { useFirstPipelineSteps } from "../../apis/modules/pipeline/pipeline-step-mutations";

export enum TaskAppointment {
  rdv_agence = "rdv_agence",
  rdv_telephonique = "rdv_telephonique",
}

const formSchema = z.object({
  Etat: z.string(),
  Pipeline: z.string(),
  Etape: z.string(),
  AssignedTo: z.string(),
  Type: z.nativeEnum(TaskAppointment),
  DateEcheance: z.string().min(1),
  HeureDeRappel: z.string().min(1),
  RendezVous: z.boolean(),
  TypeRendezVous: z.string().optional(),
  AccepterReginerateMandat: z.boolean(),
  Commentaire: z.string(),
  CommentairePrescripteur: z.string(),
});

export type FormSchema = z.infer<typeof formSchema>;

const TypeOptions = [
  { value: TaskAppointment.rdv_agence, label: "RDV en agence" },
  { value: TaskAppointment.rdv_telephonique, label: "RDV téléphonique" },
];

export default function EtapeModalComponentForm({
  onClose,
  data,
}: {
  onClose?: () => void;
  data: HeaderProjet;
}) {
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      Etat: data.task?.etat ?? "",
      Pipeline: data.task?.etape?.stepId ?? "",
      Etape: data.task?.etape.id ?? "",
      AssignedTo: data.task?.assignedUser?.id?.toString() ?? "",
      Type:
        (data.task?.typeRdv as TaskAppointment) ?? TaskAppointment.rdv_agence,
      DateEcheance: data?.task?.dateEcheance?.split("T")[0] ?? "",
      HeureDeRappel:
        data?.task?.rappelHour?.split("T")[1]?.substring(0, 5) ?? "",
      RendezVous: false,
      TypeRendezVous: "",
      AccepterReginerateMandat: false,
      Commentaire: data.task?.comment ?? "",
      CommentairePrescripteur: data.task?.commentPrescr ?? "",
    },
  });

  const { data: subStepData } = useSubStepByStepId(form.watch("Pipeline"));

  const { data: steps } = useFirstPipelineSteps();

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useUsers({});

  const rendezVousChecked = form.watch("RendezVous");

  function onSubmit(values: FormSchema) {
    try {
      toast.success("Form submitted successfully!");
    } catch {
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        {/* Etat */}
        <FormField
          control={form.control}
          name="Etat"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Etat</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={field.value}>
                    {field.value || "Valeur inconnue"}
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Pipeline */}
        <FormField
          control={form.control}
          name="Pipeline"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4">
              <FormLabel>Pipeline</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {steps?.map((option) => (
                    <SelectItem key={option.id} value={option.id.toString()}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Etape */}
        <FormField
          control={form.control}
          name="Etape"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4">
              <FormLabel>Etape</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {subStepData?.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* AssignedTo */}
        <FormField
          control={form.control}
          name="AssignedTo"
          render={({ field }) => {
            const selectedUser = users?.data?.find(
              (user) => user.id.toString() === field.value,
            );

            return (
              <FormItem className="mt-4 mb-4">
                <FormLabel>Tâche assignée à</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          isUsersLoading
                            ? "Chargement..."
                            : "Sélectionner un utilisateur"
                        }
                      >
                        {selectedUser
                          ? `${selectedUser.firstName} ${selectedUser.lastName}`
                          : null}
                      </SelectValue>
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {isUsersLoading ? (
                      <SelectItem value="loading" disabled>
                        Chargement des utilisateurs...
                      </SelectItem>
                    ) : isUsersError ? (
                      <SelectItem value="error" disabled>
                        Erreur lors du chargement
                      </SelectItem>
                    ) : users?.data?.length ? (
                      users.data.map((user) => (
                        <SelectItem key={user.id} value={user.id.toString()}>
                          {user.firstName} {user.lastName}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="no-user" disabled>
                        Aucun utilisateur disponible
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* DateEcheance */}
        <FormField
          control={form.control}
          name="DateEcheance"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4">
              <FormLabel>Date d&apos;échéance</FormLabel>
              <FormControl>
                <Input placeholder="" type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* HeureDeRappel */}
        <FormField
          control={form.control}
          name="HeureDeRappel"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4">
              <FormLabel>Heure de rappel</FormLabel>
              <FormControl>
                <Input placeholder="" type="time" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* RendezVous */}
        <FormField
          control={form.control}
          name="RendezVous"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Rendez-vous</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Type */}
        {rendezVousChecked && (
          <FormField
            control={form.control}
            name="Type"
            render={({ field }) => (
              <FormItem className="mt-4 mb-4">
                <FormLabel>Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {TypeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {/* AccepterReginerateMandat */}
        <FormField
          control={form.control}
          name="AccepterReginerateMandat"
          render={({ field }) => (
            <FormItem className="mb-4 flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={Boolean(field.value)}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accepter la régéneration du mandat</FormLabel>
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        {/* Commentaire */}
        <FormField
          control={form.control}
          name="Commentaire"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4">
              <FormLabel className="font-medium">
                Ajouter un commentaire
              </FormLabel>
              <div className="flex items-start gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="mt-1 h-10 w-8"
                  onClick={() => toast.info("SMS envoyé!")}
                >
                  <MessageSquareText className="h-4 w-4" />
                </Button>
                <FormControl>
                  <Textarea
                    placeholder="27/03 TC Je sors de visite Sylvain, pour un de mes biens les clients sont intéressés..."
                    className="min-h-[100px] flex-1 resize-none"
                    {...field}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* CommentairePrescripteur */}
        <FormField
          control={form.control}
          name="CommentairePrescripteur"
          render={({ field }) => (
            <FormItem className="mt-4 mb-4 ml-10">
              <FormLabel>Ajouter un commentaire prescripteur</FormLabel>
              <FormControl>
                <Textarea
                  placeholder=""
                  className="min-h-[100px] w-full resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Buttons */}
        <div className="mt-4 flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => onClose?.()}>
            Annuler
          </Button>
          <Button type="submit" variant="default">
            Confirmer
          </Button>
        </div>
      </form>
    </Form>
  );
}
