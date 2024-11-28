import { Box, Flex } from '@chakra-ui/layout'
import { Icon } from '@chakra-ui/icon'
import { useColorMode } from '@chakra-ui/color-mode'
import { Link } from '@chakra-ui/layout'
import { Stack } from '@chakra-ui/layout'
import { Text } from '@chakra-ui/text'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings
} from 'react-icons/fi'
import NextLink from 'next/link'

interface NavItemProps {
  icon: any
  children: string
  href: string
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
  return (
    <Link
      as={NextLink}
      href={href}
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'brand.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  )
}

export default function Sidebar() {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.800')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      pt="20"
    >
      <Stack spacing={0} align="stretch">
        <NavItem icon={FiHome} href="/">
          Dashboard
        </NavItem>
        <NavItem icon={FiTrendingUp} href="/analytics">
          Analytics
        </NavItem>
        <NavItem icon={FiCompass} href="/explore">
          Explore
        </NavItem>
        <NavItem icon={FiStar} href="/favorites">
          Favorites
        </NavItem>
        <NavItem icon={FiSettings} href="/settings">
          Settings
        </NavItem>
      </Stack>
    </Box>
  )
} 