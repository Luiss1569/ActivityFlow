import {
  Box,
  List,
  ListItem,
  Tag,
  Tooltip,
  Link as ChakraLink,
  TagLabel,
  TagProps,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useLocation } from "react-router-dom";

import {
  BsHouse,
  BsBuilding,
  BsPerson,
  BsTag,
  BsFileEarmarkText,
  BsPostcardFill,
} from "react-icons/bs";
import { FaRegEnvelope, FaUniversity } from "react-icons/fa";
import { GoWorkflow } from "react-icons/go";
import React from "react";
import Can from "@components/atoms/Can";

const CustomCard = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ children, ...rest }, ref) => (
    <Box p="0">
      <Tag
        ref={ref}
        {...rest}
        backgroundColor="transparent"
        size="lg"
        borderRadius="none"
        justifyContent="flex-start"
        alignItems="center"
      >
        <TagLabel>{children}</TagLabel>
      </Tag>
    </Box>
  )
);

function Sidebar() {
  const location = useLocation();

  return (
    <List fontSize="xl" spacing={4}>
      <ListItem py={1}></ListItem>
      <Can permission="dashboard.view">
        <NavLink
          to="/portal"
          label="Dashboard"
          icon={BsHouse}
          active={location.pathname === "/portal"}
        />
      </Can>

      <Can permission="user.view">
        <NavLink
          to="/portal/users"
          label="Usuários"
          icon={BsPerson}
          active={location.pathname === "/portal/users"}
        />
      </Can>

      <Can permission="institute.view">
        <NavLink
          to="/portal/institutes"
          label="Instituições"
          icon={BsBuilding}
          active={location.pathname === "/portal/institutes"}
        />
      </Can>

      <Can permission="university.view">
        <NavLink
          to="/portal/universities"
          label="Universidades"
          icon={FaUniversity}
          active={location.pathname === "/portal/universities"}
        />
      </Can>

      <Can permission="status.view">
        <NavLink
          to="/portal/statuses"
          label="Status"
          icon={BsTag}
          active={location.pathname === "/portal/statuses"}
        />
      </Can>

      <Can permission="email.view">
        <NavLink
          to="/portal/emails"
          label="Emails"
          icon={FaRegEnvelope}
          active={location.pathname === "/portal/emails"}
        />
      </Can>

      <Can permission="form.view">
        <NavLink
          to="/portal/forms"
          label="Formulários"
          icon={BsFileEarmarkText}
          active={location.pathname === "/portal/forms"}
        />
      </Can>

      <Can permission="workflow.view">
        <NavLink
          to="/portal/workflows"
          label="Fluxos"
          icon={GoWorkflow}
          active={location.pathname === "/portal/workflows"}
        />
      </Can>

      <Can permission="reporting.view">
        <NavLink
          to="/portal/reportings"
          label="Relatórios"
          icon={BsPostcardFill}
          active={location.pathname === "/portal/reportings"}
        />
      </Can>
    </List>
  );
}

const NavLink = React.memo(
  ({
    to,
    label,
    icon: Icon,
    active = false,
  }: {
    to: string;
    label: string;
    icon: React.ElementType;
    active?: boolean;
  }) => (
    <ListItem>
      <ChakraLink as={ReactRouterLink} to={to}>
        <Tooltip
          label={label}
          aria-label="A tooltip"
          hasArrow
          size="md"
          placement="right-end"
          id={to.replace("/portal/", "")}
        >
          <CustomCard
            _hover={{ textDecor: "none", color: "blue.500" }}
            _focus={{ outline: "none" }}
            color={active ? "blue.500" : ""}
          >
            <Icon size={24} />
          </CustomCard>
        </Tooltip>
      </ChakraLink>
    </ListItem>
  )
);

export default Sidebar;
